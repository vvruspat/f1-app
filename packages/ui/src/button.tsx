"use client";

import React, { type ComponentProps } from "react";
import {
	Pressable,
	Text,
	StyleSheet,
	type ViewStyle,
	type TextStyle,
} from "react-native";

type Props = ComponentProps<typeof Pressable> & {
	title: string;
	onPress?: () => void;
	style?: ViewStyle;
	textStyle?: TextStyle;
	children: string;
};

export const Button = ({ children, onPress, style, textStyle }: Props) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, style]}>
			<Text style={[styles.text, textStyle]}>{children}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#007aff",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	text: {
		color: "#fff",
		fontWeight: "600",
		textAlign: "center",
	},
});
