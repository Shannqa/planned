import React from "react";
import { Text, View, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

function TenTapEditor() {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });
  
  const initialContent = `<p>Initial</p>`;
  
  return(
    <View style={styles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  )
}


const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});