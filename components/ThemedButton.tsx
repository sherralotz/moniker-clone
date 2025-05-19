import React, { ReactNode, useState } from 'react';
import { Pressable, Text, View, StyleSheet, GestureResponderEvent } from 'react-native';
import { Link,useRouter  } from 'expo-router'; 

interface ThemedButtonProps {
  title?: string;
  onPress?: () => void;
  href?: string;
  containerClassNames?: string;
  btnClassNames?: string; 
  variant?: 'brand-red-btn' | 'brand-white-btn' | 'brand-orange-btn' | 'brand-green-btn' | 'link';
  btnSize?: 'brand-lg' | 'brand-md' | 'brand-sm' | 'brand-xs';
  btnTextWeight?: string;
  btnTextColor?: string;
  style?: any;
  textStyle?: any;
  content?: ReactNode;
  icon?: ReactNode;
  iconClassNames?: string;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  href,
  containerClassNames,
  btnClassNames,
  variant,
  btnSize,
  btnTextColor,
  btnTextWeight = 'bold',
  style,
  textStyle,
  content,
  icon
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const offset = 3; //animation offset
  const colors = getButtonColors(variant, btnTextColor);
  const btnThemeSize = getButtonSize(btnSize);
const router = useRouter();

  const buttonPressIn = () => setIsPressed(true);
const buttonPressOut = (event: GestureResponderEvent) => {
  setIsPressed(false);
  if (onPress) onPress();
  if (href) router.push(href);  
};

  const buttonContent = (
    <View style={styles.wrapper} 
    className={containerClassNames ?? ''}>
      {!isPressed && (
        <View
          style={[
            styles.shadowLayer,
            {
              backgroundColor: colors.shadow,
              top: offset,
              height: btnThemeSize.height
            },
          ]}
        />
      )}

      <View
        className={btnClassNames ?? ''}
        style={[
          styles.button,
          {
            backgroundColor: colors.base,
            borderColor: colors.border,
            top: isPressed ? offset : 0,
              height: btnThemeSize.height,
          }, 
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
        {icon && <View>{icon}</View>}

        {title && (
          <Text style={[
            styles.buttonText,
            {
              color: colors.text,
              fontWeight: btnTextWeight
            },
            textStyle,
          ]}>
            {title}
          </Text>
        )} 
        {content ? <>{content}</> : ''} 
      </View>  
      </View>
    </View>
  );

  if (href) {
    return (
     <Pressable
    onPressIn={buttonPressIn}
    onPressOut={buttonPressOut}
    className={containerClassNames ?? ''}
    style={[styles.wrapper, style]}
  >
    {buttonContent}
  </Pressable>
    );
  }

  return (
    <Pressable
      onPressIn={buttonPressIn}
      onPressOut={buttonPressOut}
      className={containerClassNames ?? ''}
      style={[styles.wrapper, style]}
    >
      {buttonContent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',  
  },
  shadowLayer: {
    position: 'absolute',
    left: 0,
    right: 0, 
    borderRadius: 10,
    zIndex: 0,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0, 
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonText: {
    fontSize: 19, 
  },
});

const getButtonColors = (variant: ThemedButtonProps['variant'], btnTextColor: ThemedButtonProps['btnTextColor']) => {
  switch (variant) {
    case 'brand-red-btn':
      return { base: '#dc2626', shadow: '#b91c1c', text: btnTextColor ? btnTextColor : 'white', border: '#b91c1c' };
    case 'brand-white-btn':
      return { base: '#f8fafc', shadow: '#e5e7eb', text: btnTextColor ? btnTextColor : '#dc2626', border: '#e5e7eb' }; 
    case 'brand-orange-btn':
      return { base: '#f97316', shadow: '#ea580c', text: btnTextColor ? btnTextColor : 'white', border: '#ea580c' };
    case 'brand-green-btn':
      return { base: '#16a34a', shadow: '#15803d', text: btnTextColor ? btnTextColor : 'white', border: '#15803d' };
    case 'link':
      return { base: 'transparent', shadow: 'transparent', text: btnTextColor ? btnTextColor : '#dc2626', border: 'transparent' };
    default:
      return { base: '#0597ff', shadow: '#0ea5e9', text: btnTextColor ? btnTextColor : 'white', border: '#0ea5e9' };
  }
};

const getButtonSize = (btnSize: ThemedButtonProps['btnSize']) => {
  switch (btnSize) {
    case 'brand-xs': 
      return { height: 35 };
    case 'brand-sm': 
      return { height: 40 };
    case 'brand-md':
      return { height: 45 };
    case 'brand-lg':
      return { height: 55 };
    default:
      return { height: 55 };
  }
};

export default ThemedButton;