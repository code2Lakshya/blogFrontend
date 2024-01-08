export const timePassed=(date)=> {
    let output;
    const convertedDate = new Date(Date.now() - new Date(date) - 19800000);
    console.log(convertedDate);
    if (convertedDate.getFullYear() > 1970)
        output = (convertedDate.getFullYear() - 1970) + 'y';
    else if (convertedDate.getMonth() > 0)
        output = (convertedDate.getMonth() + 1) + 'm';
    else if (convertedDate.getDate() > 1) {
        if (convertedDate.getDate() >= 7)
            output = Math.floor(convertedDate.getDate() / 7) + 'w';
        else
            output = convertedDate.getDate() + 'd';
    }
    else if (convertedDate.getHours() > 0) {
        output =convertedDate.getHours() + 'h';
    }
    else if (convertedDate.getMinutes() > 0) {
        output = convertedDate.getMinutes() + 'm';
    }
    else if (convertedDate.getSeconds() > 0) {
        output = convertedDate.getSeconds() + 's';
    }
    else {
        output = '1s';
    }
    return output;
}