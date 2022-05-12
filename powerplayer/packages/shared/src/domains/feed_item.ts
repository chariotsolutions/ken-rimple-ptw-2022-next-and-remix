export default interface FeedItem {
    // CoPilot inferred these variables for me, nice. Each one progressively.
    guid: string;
    feedId: string;
    title: string;
    description: string;
    enclosureUrl: string;
    pubDate: Date;
}
