import moment from "moment";

interface Item {
    value: any;
    expiry: string;
}

const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = moment();
    const item: Item = {
        value: value,
        expiry: now.add(ttl, "days").toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(item));
}

const getWithExpiry = (key: string): any => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item: Item = JSON.parse(itemStr);
    const now = moment();
    if (now.isAfter(item.expiry)) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export {
    setWithExpiry,
    getWithExpiry
}