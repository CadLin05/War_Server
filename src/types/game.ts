export interface game{
    id: number;
    user_id: number;
    result: string; //always 'win' 'lose' or 'tie'
    rounds: number;
    time: Date; //might have to find a way to convert datetime?
}