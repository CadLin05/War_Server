export interface game {
    game_id: number;
    user_id: number;
    result: string; //always 'win' 'lose' or 'tie'
    rounds: number;
    time: string; //might have to find a way to convert datetime?
}