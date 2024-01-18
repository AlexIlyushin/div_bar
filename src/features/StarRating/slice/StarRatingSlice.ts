import { createSlice } from '@reduxjs/toolkit';

interface Games {
    name: string;
    bestResult: number;
    isPlayed: boolean;
}

export interface Stages {
    name: string;
    id: number;
    thresholdPoints: number;
    games: Games[];
}

interface RatingState {
    currentStage: number;
    stages: Stages[];
}

const initialState: RatingState = {
    currentStage: 0,
    stages: [
        {
            name: 'Этап первый',
            id: 1,
            thresholdPoints: 25,
            games: [
                {
                    name: 'Игра 1.1',
                    bestResult: 15,
                    isPlayed: false,
                },
                {
                    name: 'Игра 1.2',
                    bestResult: 5,
                    isPlayed: false,
                },
            ],
        },
        {
            name: 'Этап второй',
            id: 2,
            thresholdPoints: 50,
            games: [
                {
                    name: 'Игра 2.1',
                    bestResult: 50,
                    isPlayed: false,
                },
            ],
        },
        {
            id: 3,
            name: 'Этап третий',
            thresholdPoints: 100,
            games: [
                {
                    name: 'Игра 3.1',
                    bestResult: 20,
                    isPlayed: false,
                },
                {
                    name: 'Игра 3.2',
                    bestResult: 20,
                    isPlayed: false,
                },
                {
                    name: 'Игра 3.3',
                    bestResult: 40,
                    isPlayed: false,
                },
            ],
        },
        {
            id: 4,
            name: 'Этап четвертый',
            thresholdPoints: 200,
            games: [
                {
                    name: 'Игра 4.1',
                    bestResult: 150,
                    isPlayed: false,
                },
                {
                    name: 'Игра 4.2',
                    bestResult: 40,
                    isPlayed: false,
                },
            ],
        },
        {
            id: 5,
            name: 'Этап пятый',
            thresholdPoints: 500,
            games: [
                {
                    name: 'Игра 5.1',
                    bestResult: 350,
                    isPlayed: true,
                },
            ],
        },
        {
            id: 6,
            name: 'Этап шестой',
            thresholdPoints: 1000,
            games: [
                {
                    name: 'Игра 6.1',
                    bestResult: 550,
                    isPlayed: true,
                },
                {
                    name: 'Игра 6.2',
                    bestResult: 250,
                    isPlayed: true,
                },
            ],
        },
    ],
};

export const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        incrementPage: (state: { currentStage: number }) => {
            state.currentStage += 1;
        },
        decrementPage: (state: { currentStage: number }) => {
            state.currentStage -= 1;
        },
    },
});

export const { incrementPage, decrementPage } = ratingSlice.actions;

export default ratingSlice.reducer;
