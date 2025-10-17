import '../styles/ErrorMessage.css'

type ErrorMessageProps = {
    message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="errorMessage">
            {message}
        </div>
    )
}