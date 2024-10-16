// Importa tipos do React e módulos do React Native e React Native Reanimated
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { 
  interpolate, 
  useAnimatedRef, 
  useAnimatedStyle, 
  useScrollViewOffset 
} from 'react-native-reanimated';

// Importa um componente temático personalizado
import { ThemedView } from '@/components/ThemedView';

// Define uma constante para a altura do cabeçalho
const HEADER_HEIGHT = 150;

// Define o tipo de propriedades esperadas pelo componente ParallaxScrollView
type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

// Define o componente funcional ParallaxScrollView
export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light'; // Obtém o esquema de cores atual (claro ou escuro)
  const scrollRef = useAnimatedRef<Animated.ScrollView>(); // Cria uma referência animada para o ScrollView
  const scrollOffset = useScrollViewOffset(scrollRef); // Obtém o offset de rolagem do ScrollView

  // Define o estilo animado para o cabeçalho
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

// Define estilos usando StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT, // Define a altura do cabeçalho
    overflow: 'hidden', // Oculta qualquer conteúdo que ultrapasse os limites do cabeçalho
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16, // Adiciona espaçamento entre os elementos
    overflow: 'hidden', // Oculta qualquer conteúdo que ultrapasse os limites do conteúdo
  },
});
