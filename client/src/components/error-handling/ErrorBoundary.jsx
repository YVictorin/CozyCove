import React from "react";

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
       console.error(error, info);
    }

    render() {
        if(this.state.hasError) {
            return this.props.fallback  //by default this component does not until an error occurs
        }
        return this.props.children;
    }
}

export default ErrorBoundary
