declare module 'react-simple-chatbot' {
    export interface ChatBotProps {
        steps: any[];
        userAvatar?: string;
        botAvatar?: string;
        headerTitle?: string,
        bubbleStyle?: React.CSSProperties,
        inputStyle?: React.CSSProperties,
        bubbleOptionStyle?: React.CSSProperties,
        width?: string,
        handleEnd?: () => void,
        floating?: boolean,
        floatingIcon?: 'string' | ReactElement,
        floatingStyle?: React.CSSProperties | any,
        headerComponent?: any
        opened?: boolean
        toggleFloating?: () => void
        cache?: false

        // Add any additional props specific to your usage
    }

    export default class ChatBot extends React.Component<ChatBotProps> { }
}
