import { Component, ErrorInfo, PropsWithChildren, ReactElement } from "react"

type ErrorBoundaryPropsType = PropsWithChildren<{
    fallback: ReactElement;
}>
  
type State = {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryPropsType, State> {
    constructor(props: ErrorBoundaryPropsType) {
        super(props);
        this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary