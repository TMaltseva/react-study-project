export interface SearchResult {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}
export interface SearchResultsProps {
    results: SearchResult[];
}
export interface SearchResultsState {
}
