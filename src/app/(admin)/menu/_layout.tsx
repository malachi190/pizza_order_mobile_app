import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name='shopping-cart'
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
  );
}
