export const formatDate = (date) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const day = String(date.getDate()).padStart(2, "0")
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day}. ${month} ${year}`
}

export const makeSlug = (title) => {
    return title
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
        .trim() // Trim spaces
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .slice(0, 50)
}

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
