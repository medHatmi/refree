import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const FloatingInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.focusedLabel]}>{label}</Text>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    left: 10,
    top: 18,
    zIndex: 1,
    paddingHorizontal: 5,
  },
  focusedLabel: {
    color: '#4285f4',
  },
  input: {
    fontSize: 16,
    padding: 2,
    paddingLeft: 10,
    marginTop: 30,
  },
  focusedInput: {
    borderBottomColor: '#4285f4',
  },
});

export default FloatingInput;
