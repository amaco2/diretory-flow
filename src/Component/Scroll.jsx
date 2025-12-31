import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export function SectionMotion( { children } )
{
    return (
        <motion.section
            initial={ { opacity: 0, y: 40 } }
            whileInView={ { opacity: 1, y: 0 } }
            viewport={ { once: true, margin: "-100px" } }
            transition={ {
                duration: 0.6,
                ease: "easeOut",
            } }
        >
            { children }
        </motion.section>
    );
}


export function StatsSection()
{
    const ref = useRef( null );
    const { scrollYProgress } = useScroll( {
        target: ref,
        offset: [ "start end", "center center" ],
    } );

    const opacity = useTransform( scrollYProgress, [ 0, 0.4 ], [ 0, 1 ] );

    return (
        <section ref={ ref }>
            <motion.div style={ { opacity } }>
                📊 Statistiques DirectoryFlow
            </motion.div>
        </section>
    );
}

export function AnimatedBloc( { children } )
{
    const { scrollY } = useScroll();

    const opacity = useTransform( scrollY, [ 200, 350 ], [ 0, 1 ] );
    const y = useTransform( scrollY, [ 100, 250 ], [ 40, 0 ] );

    return (
        <motion.section style={ { opacity, y } }
            initial={ { opacity: 0 } }
            animate={ { opacity: 1, calcMode: 2 } }
            exit={ { opacity: 0 } }
            transition={ { duration: 0.3 } }
            whileInView={ { opacity: 1, y: 0 } }
            viewport={ {
                once: true,   // une seule fois
                amount: 0.4,  // 40% visible avant déclenchement
            } }>
            { children }
        </motion.section>
    );
}

// export function AnimatedBlock()
// {
//     const { scrollY } = useScroll();

//     const opacity = useTransform( scrollY, [ 200, 350 ], [ 0, 1 ] );
//     const y = useTransform( scrollY, [ 200, 350 ], [ 40, 0 ] );

//     return (
//         <motion.div style={ { opacity, y } }>
//             Élément affiché à 300px
//         </motion.div>
//     );
// }

