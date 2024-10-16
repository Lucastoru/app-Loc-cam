// Importa o ícone Ionicons do Expo, e hooks e componentes do React e React Native
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

// Importa componentes customizados ThemedText e ThemedView, e cores constantes
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

// Define um componente funcional Collapsible
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se o conteúdo está aberto ou fechado
  const theme = useColorScheme() ?? 'light'; // Obtém o tema de cores (claro ou escuro)

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading} // Aplica estilos ao cabeçalho
        onPress={() => setIsOpen((value) => !value)} // Alterna o estado isOpen ao pressionar
        activeOpacity={0.8} // Define a opacidade ativa para o toque
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'} // Alterna o ícone com base no estado isOpen
          size={24}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} // Define a cor do ícone com base no tema
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText> // Exibe o título com estilo de texto temático
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>} // Mostra o conteúdo se isOpen for verdadeiro
    </ThemedView>
  );
}

// Define estilos usando StyleSheet
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row', // Organiza os elementos em linha
    alignItems: 'center', // Alinha os itens ao centro na direção vertical
    gap: 4, // Espaçamento entre os itens
  },
  content: {
    marginTop: 10, // Margem superior
    marginLeft: 18, // Margem esquerda
  },
});
