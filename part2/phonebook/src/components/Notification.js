const Notification = ({notification}) => {
    if(notification === null) return null

    return (
        <div className={notification.class}>
            {notification.message}
        </div>
    )
}

export default Notification