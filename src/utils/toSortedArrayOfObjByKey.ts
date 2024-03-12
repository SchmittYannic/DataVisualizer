const toSortedArrayOfObjByKey = <T>(array: T[], key: keyof T): T[] => {
    const arrayCopy = JSON.parse(JSON.stringify(array)) as T[];
    return arrayCopy.sort((a, b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

export default toSortedArrayOfObjByKey