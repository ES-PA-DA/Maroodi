import {
  Text,
  StyleSheet
} from "react-native";

import Typography from "@constants/Typography";

type HeaderProps = {
  children: string,
};

export default function Header({ children } : HeaderProps) {
  return (<Text style={styles.title}>{ children }</Text>);
}

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.sizes.title,
    textAlign: 'center',
    fontFamily: Typography.fonts.bold,
  },
});
