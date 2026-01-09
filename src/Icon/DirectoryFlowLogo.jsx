/**
 * DirectoryFlow Logo Component
 * Icône personnalisée professionnelle pour DirectoryFlow
 * Combinaison de production audiovisuelle et organisation
 */

// function DirectoryFlowLogo( { size = 50, color = "#0d47a1", className = "" } )
// {
//     return (
//         <svg
//             width={ size }
//             height={ size }
//             viewBox="0 0 100 100"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className={ className }
//         >
//             {/* Background Circle */ }
//             <circle cx="50" cy="50" r="48" fill={ color } opacity="0.1" stroke={ color } strokeWidth="2" />

//             {/* Film Reel / Clapperboard inspired shape */ }
//             <g transform="translate(50, 50)">
//                 {/* Center circle */ }
//                 <circle cx="0" cy="0" r="12" fill={ color } />

//                 {/* Flowing lines representing direction/flow */ }
//                 {/* Top right curved path */ }
//                 <path
//                     d="M 12 0 Q 28 -15 35 -8"
//                     stroke={ color }
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                 />

//                 {/* Right curved path */ }
//                 <path
//                     d="M 15 8 Q 30 18 32 28"
//                     stroke={ color }
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                 />

//                 {/* Bottom left curved path */ }
//                 <path
//                     d="M -12 8 Q -28 20 -32 32"
//                     stroke={ color }
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                 />

//                 {/* Left curved path */ }
//                 <path
//                     d="M -15 -8 Q -28 -18 -35 -10"
//                     stroke={ color }
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                 />

//                 {/* Direction arrows/triangles at ends */ }
//                 <polygon points="35,-8 38,-12 40,-6" fill={ color } />
//                 <polygon points="32,28 36,32 30,34" fill={ color } />
//                 <polygon points="-32,32 -36,36 -30,34" fill={ color } />
//                 <polygon points="-35,-10 -40,-14 -38,-4" fill={ color } />
//             </g>

//             {/* Text label */ }
//             <text
//                 x="50"
//                 y="88"
//                 textAnchor="middle"
//                 fontSize="8"
//                 fontWeight="bold"
//                 fill={ color }
//                 fontFamily="Arial, sans-serif"
//                 letterSpacing="1"
//             >
//                 DF
//             </text>
//         </svg>
//     );
// }

/**
 * DirectoryFlow Logo Component
 * Icône personnalisée professionnelle pour DirectoryFlow
 * Design moderne combinant production audiovisuelle et flux d'organisation
 */

function DirectoryFlowLogo( { size = 50, color = "#0d47a1", className = "" } )
{
    return (
        <svg
            width={ size }
            height={ size }
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={ className }
            style={ { display: 'inline-block' } }
        >
            {/* Outer circle background */ }
            <defs>
                <linearGradient id="dfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={ { stopColor: color, stopOpacity: 1 } } />
                    <stop offset="100%" style={ { stopColor: color, stopOpacity: 0.6 } } />
                </linearGradient>
            </defs>

            {/* Background circle with gradient */ }
            <circle cx="50" cy="50" r="46" fill="url(#dfGradient)" opacity="0.15" />
            <circle cx="50" cy="50" r="46" fill="none" stroke={ color } strokeWidth="1.5" />

            {/* Play/Direction symbol - Film production inspired */ }
            <g transform="translate(50, 50)">
                {/* Center core circle */ }
                <circle cx="0" cy="0" r="10" fill={ color } />

                {/* Film strips / organization flow lines */ }
                {/* Upper right flow */ }
                <path
                    d="M 10 -2 L 28 -18 L 32 -14"
                    stroke={ color }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Right flow */ }
                <path
                    d="M 12 8 L 32 22 L 30 28"
                    stroke={ color }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Bottom left flow */ }
                <path
                    d="M -10 10 L -28 24 L -32 20"
                    stroke={ color }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Left flow */ }
                <path
                    d="M -12 -8 L -32 -20 L -28 -26"
                    stroke={ color }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Arrow heads to indicate direction */ }
                <circle cx="32" cy="-14" r="2" fill={ color } />
                <circle cx="30" cy="28" r="2" fill={ color } />
                <circle cx="-32" cy="20" r="2" fill={ color } />
                <circle cx="-28" cy="-26" r="2" fill={ color } />
            </g>

            {/* Bottom accent bar */ }
            <rect x="20" y="82" width="60" height="2" rx="1" fill={ color } opacity="0.4" />

            {/* Initials text */ }
            <text
                x="50"
                y="92"
                textAnchor="middle"
                fontSize="7"
                fontWeight="bold"
                fill={ color }
                fontFamily="'Segoe UI', Arial, sans-serif"
                letterSpacing="0.5"
            >
                DF
            </text>
        </svg>
    );
}

export default DirectoryFlowLogo;
