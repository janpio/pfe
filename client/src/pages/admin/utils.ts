export const formatDate = (unformatedDate: any) => {
    const date = new Date(unformatedDate);

    const formattedDate = date.toLocaleDateString('en-EN', {
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-EN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    return formattedDateTime

}