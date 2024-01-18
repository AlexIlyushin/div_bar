/// <reference types="vite-plugin-svgr/client" />
import StarIcon from '../../assets/icons/star.svg?react';
import WinIcon from '../../assets/icons/win.svg?react';
import { useAppSelector, useAppDispatch } from '../../app/hooks/hooks';
import { decrementPage, incrementPage, Stages } from './slice/StarRatingSlice';

const StarRating = () => {
    const dispatch = useAppDispatch();

    const currentStage = useAppSelector((state) => state.rating.currentStage);
    const stages = useAppSelector((state) => state.rating.stages);

    const sumStageProgress = stages[currentStage].games.reduce(
        (total, game) => total + game.bestResult,
        0,
    );

    const getIsLastStage = (stage: Stages) => {
        return stage.id === stages[stages.length - 1].id;
    };

    const getIsCurrentStage = (stage: Stages) => {
        return stage.id === stages[currentStage].id;
    };

    const getIsPlayed = (stage: Stages) => {
        return stage.games.some((game) => game.isPlayed);
    };

    const steps = stages.map((stage) => {
        const isLastStage = getIsLastStage(stage);
        const isPlayed = getIsPlayed(stage);
        const hasBestResult = sumStageProgress >= stage.thresholdPoints;
        const iconClassname =
            isPlayed || hasBestResult
                ? 'progress-marker__icon--filled'
                : 'progress-marker__icon--normal';

        return (
            <div key={stage.id} className="progress-marker__step">
                <div className="progress-marker__icon-container">
                    {isLastStage ? (
                        <WinIcon
                            className="progress-marker__icon"
                            style={{ width: '40px', height: '24px' }}
                        />
                    ) : (
                        <StarIcon
                            className={`progress-marker__icon ${iconClassname}`}
                        />
                    )}
                </div>
                <p className="progress-marker__text">
                    {getIsCurrentStage(stage) && sumStageProgress + '/'}
                    {stage.thresholdPoints}
                </p>
            </div>
        );
    });

    const incrementCurrentStage = () => {
        if (!getIsLastStage(stages[currentStage])) {
            dispatch(incrementPage());
        }
    };

    const decrementCurrentStage = () => {
        if (currentStage > 0) {
            dispatch(decrementPage());
        }
    };

    return (
        <>
            <section className="main-container">
                <div className="progress-bar-container">
                    {stages.map((stage, i) => {
                        const prevStage = stages[i - 1]?.thresholdPoints || 0;
                        const maxValStage =
                            stage.thresholdPoints -
                            (stages[i - 1]?.thresholdPoints || 0);

                        const progress =
                            currentStage === i
                                ? sumStageProgress - prevStage
                                : currentStage < i
                                  ? 0
                                  : stage.thresholdPoints;

                        return (
                            <progress
                                key={stage.thresholdPoints}
                                className={`progress-item-${i + 1}`}
                                max={maxValStage}
                                value={progress}
                            ></progress>
                        );
                    })}
                </div>
                <div className="progress-marker-container">{steps}</div>
            </section>

            <div className="button-control-container">
                <button
                    type="button"
                    className="button"
                    onClick={decrementCurrentStage}
                >
                    Stage-
                </button>

                <button
                    type="button"
                    className="button"
                    onClick={incrementCurrentStage}
                >
                    Stage+
                </button>
            </div>
            <div style={{ textAlign: 'left' }}>
                Для проверки:
                <pre>{JSON.stringify(stages, null, 2)}</pre>
            </div>
        </>
    );
};

export default StarRating;
