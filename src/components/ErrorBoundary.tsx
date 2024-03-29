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
  
    static getDerivedStateFromError(_error: Error) {
        return { hasError: true };
    }

    componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
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