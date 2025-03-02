import { Text, TextProps } from "react-native";

export function SFProText(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: "SFPro" }]} />;
}

export function SpaceMono(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
