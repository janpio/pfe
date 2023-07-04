export const formatDate = (unformatedDate: any) => {
    const date = new Date(unformatedDate);

    const formattedDate = date.toLocaleDateString('fr-FR', {
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    return formattedDateTime

}