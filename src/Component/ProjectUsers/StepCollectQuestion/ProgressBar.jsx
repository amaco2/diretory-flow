import { useLocation } from 'react-router-dom';
import './Steps.css';

function ProgressBar()
{
    const location = useLocation();
    const path = location.pathname;
    const stepMatch = path.match( /step(\d+)/ );
    const currentStep = stepMatch ? parseInt( stepMatch[ 1 ] ) : 1;
    const totalSteps = 6;
    const progress = ( currentStep / totalSteps ) * 100;

    return (
        <div className="progress-container" role="progressbar" aria-valuenow={ currentStep } aria-valuemin="1" aria-valuemax={ totalSteps } aria-label={ `Étape ${ currentStep } sur ${ totalSteps }` }>
            <div className="progress-bar">
                <div className="progress-fill" style={ { width: `${ progress }%` } }></div>
            </div>
            <div className="progress-steps">
                { Array.from( { length: totalSteps }, ( _, i ) => (
                    <div key={ i + 1 } className={ `progress-step ${ i + 1 <= currentStep ? 'completed' : '' } ${ i + 1 === currentStep ? 'current' : '' }` }>
                        <span className="step-number">{ i + 1 }</span>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

export { ProgressBar };
