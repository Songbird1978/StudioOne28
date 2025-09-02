export default function findMatch(pathname) {
    const match = pathname.match(/^\/page\/(.+)/);
    return match ? match[1] : null; // returns slug or null
}
