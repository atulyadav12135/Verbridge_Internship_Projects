import { ErrorBoundary } from "react-error-boundary";

function CustomErrorBoundaryUI({ error, resetErrorBoundary}) {
    return (
        
            <div role="alert" >
                <p>Something went wrong:</p>
                <div>{error?.message}</div>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
       

    )
}

export default function CustomErrorBoundry({ children }) {
    return (
        <ErrorBoundary 
            FallbackComponent={CustomErrorBoundaryUI}
            onReset={() => window.location.reload()}    
        >
            {children}
        </ErrorBoundary>
    )
}