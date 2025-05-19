import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";

interface CardProps {
  id: string;
  text: string;
  description: string;
  categoryId: number;
  categoryName: string;
  points: number;
}

export interface TeamScore {
  round1: number;
  round2: number;
  round3: number;
}

interface GameState {
  currentRound: 1 | 2 | 3;
  currentTeamInternal: "A" | "B"; // Internal team identifier
  remainingCards: CardProps[];
  teamAScore: TeamScore;
  teamBScore: TeamScore;
  timeRemaining: number;
  isTimerRunning: boolean;
  isStartOfNewRound: boolean;
}

interface CardContextType {
  teamAName: string;
  setTeamAName: React.Dispatch<React.SetStateAction<string>>;
  teamBName: string;
  setTeamBName: React.Dispatch<React.SetStateAction<string>>;
  selectedCards: CardProps[];
  setSelectedCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  gameState: GameState;
  startGame: () => void;
  resetGame: () => void;
  passCard: () => void;
  markCardCorrect: (onLastCardEnd?: () => void) => void;
  switchTeam: () => void;
  nextRound: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  handleEndOfTurn: (remainingCards: CardProps[], onEnd?: () => void) => void;
  resetIsStartNewRound: () => void;
  getCurrentTeamDisplayName: () => string;
  getTeamDisplayName: (teamId: "A" | "B") => string;
  setStartingTeam: (team: "A" | "B") => void;
}

const defaultTeamScore: TeamScore = {
  round1: 0,
  round2: 0,
  round3: 0,
};

const defaultGameState: GameState = {
  currentRound: 1,
  currentTeamInternal: "A", // Use internal identifier
  remainingCards: [],
  teamAScore: { ...defaultTeamScore },
  teamBScore: { ...defaultTeamScore },
  timeRemaining: 60,
  isTimerRunning: false,
  isStartOfNewRound: true,
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [isEndingTurn, setIsEndingTurn] = useState(false);
  const [teamAName, setTeamAName] = useState<string>("Team A");
  const [teamBName, setTeamBName] = useState<string>("Team B");
  const timerIntervalRef = useRef<number | null>(null);

  const setStartingTeam = (team: "A" | "B") => {
    setGameState((prevState) => ({
      ...prevState,
      currentTeamInternal: team, // Update internal identifier
    }));
  };

  const startGame = () => {
    // Reset game state and initialize with selected cards
    setGameState({
      ...defaultGameState,
      remainingCards: [...selectedCards],
    });
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  const resetIsStartNewRound = () => {
    setGameState((prevState) => ({
      ...prevState,
      isStartOfNewRound: !prevState.isStartOfNewRound,
    }));
  };

  const passCard = () => {
    if (gameState.remainingCards.length > 0) {
      const [currentCard, ...restCards] = gameState.remainingCards;
      setGameState((prevState) => ({
        // Use functional update here
        ...prevState,
        remainingCards: [...restCards, currentCard],
        isStartOfNewRound: false,
      }));
    }
  };

  const markCardCorrect = (onLastCardEnd?: () => void) => {
    if (gameState.remainingCards.length === 0) return;

    const [currentCard, ...restCards] = gameState.remainingCards;
    const roundKey = `round${gameState.currentRound}` as keyof TeamScore;

    const isLastCard = restCards.length === 0;

    setGameState((prevState) => ({
      ...prevState,
      remainingCards: restCards,
      isStartOfNewRound: false,
      ...(prevState.currentTeamInternal === "A" // Use internal identifier
        ? {
            teamAScore: {
              ...prevState.teamAScore,
              [roundKey]: prevState.teamAScore[roundKey] + currentCard.points,
            },
          }
        : {
            teamBScore: {
              ...prevState.teamBScore,
              [roundKey]: prevState.teamBScore[roundKey] + currentCard.points,
            },
          }),
    }));

    if (isLastCard) {
      setTimeout(() => {
        handleEndOfTurn(restCards, onLastCardEnd);  
      }, 0);
    }
  };

  const switchTeam = () => {
    setGameState((prevState) => ({
      // Use functional update here
      ...prevState,
      currentTeamInternal: prevState.currentTeamInternal === "A" ? "B" : "A", // Update internal identifier
      timeRemaining: 60,
    }));
  };

  const nextRound = () => {
    if (gameState.currentRound >= 3) return;

    const nextRound = (gameState.currentRound + 1) as 1 | 2 | 3;

    const teamATotal = Object.values(gameState.teamAScore).reduce(
      (a, b) => a + b,
      0
    );
    const teamBTotal = Object.values(gameState.teamBScore).reduce(
      (a, b) => a + b,
      0
    );

    const startingTeam: "A" | "B" = teamATotal <= teamBTotal ? "A" : "B";

    setGameState((prevState) => ({
      ...prevState,
      currentRound: nextRound,
      currentTeamInternal: startingTeam, // Update internal identifier
      remainingCards: [...selectedCards],
      timeRemaining: 60,
      isTimerRunning: false,
      isStartOfNewRound: true,
    }));
  };

  const handleEndOfTurn = (remainingCards: CardProps[], onEnd?: () => void) => {
    if (isEndingTurn) return;
    setIsEndingTurn(true);

    if (remainingCards.length === 0) {
      if (gameState.currentRound < 3) {
        nextRound();
      } else {
        console.log("GAME OVER");
      }
    } else {
      switchTeam();
    }

    if (onEnd) onEnd();

    setTimeout(() => setIsEndingTurn(false), 500);
  };

  const startTimer = () => {
    stopTimer();

    timerIntervalRef.current = setInterval(() => {
      setGameState((prevState) => {
        if (prevState.timeRemaining <= 0) {
          clearInterval(timerIntervalRef.current!);
          handleEndOfTurn(prevState.remainingCards);
          return {
            ...prevState,
            isTimerRunning: false,
          };
        }
        return {
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
          isTimerRunning: true,
        };
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      setGameState((prevState) => ({
        ...prevState,
        isTimerRunning: false,
      }));
    }
  };

  const resetTimer = () => {
    stopTimer();
    setGameState((prevState) => ({
      ...prevState,
      timeRemaining: 60,
    }));
  };

  const getCurrentTeamDisplayName = (): string => {
    return gameState.currentTeamInternal === "A" ? teamAName : teamBName;
  };

  const getTeamDisplayName = (teamId: "A" | "B"): string => {
    return teamId === "A" ? teamAName : teamBName;
  };

  return (
    <CardContext.Provider
      value={{
        selectedCards,
        setSelectedCards,
        gameState,
        startGame,
        resetGame,
        passCard,
        markCardCorrect,
        switchTeam,
        nextRound,
        startTimer,
        stopTimer,
        resetTimer,
        handleEndOfTurn,
        resetIsStartNewRound,
        teamAName,
        setTeamAName,
        teamBName,
        setTeamBName,
        getCurrentTeamDisplayName,
        getTeamDisplayName,
        setStartingTeam,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
}
