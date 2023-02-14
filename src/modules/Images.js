export default async function (Requesttype, Data) {
    const rv = await fetch("/images/" + Requesttype, {
        method: "POST",
        body: Data
    })
    return rv
}