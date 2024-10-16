// Importa componentes e hooks do React Native
import { Text, type TextProps, StyleSheet } from 'react-native';
// Importa o hook personalizado para tema de cores
import { useThemeColor } from '@/hooks/useThemeColor';

// Define o tipo das propriedades que o componente ThemedText aceita
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

// Define o componente funcional ThemedText
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Obtém a cor com base no tema atual (claro ou escuro)
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color }, // Aplica a cor ao texto
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style, // Aplica estilos adicionais passados via props
      ]}
      {...rest} // Propaga todas as outras propriedades para o componente Text
    />
  );
}

// Define os estilos usando StyleSheet
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
