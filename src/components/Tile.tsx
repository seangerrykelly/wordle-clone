
import '../styles/Tile.css'

type TileProps = {
    letter?: string
    index: number
    isFlipping: boolean
    type?: 'correct' | 'present' | 'absent' | 'current'
}

export const Tile = ({ letter, index, isFlipping = false, type }: TileProps) => {
    return (
        <div className={`tile ${isFlipping === true ? 'tile-flipped': ''}`}>
            <div 
                className='tile-inner' 
                style={{ transitionDelay: `${index * 200}ms`}}
            >
                <div className={`tile-front ${type === 'current' || type === 'absent' ? type : ''}`}>
                    <p className="tile-letter">
                        {letter}
                    </p>
                </div>
                <div className={`tile-back ${type}`}>
                    <p className="tile-letter">
                        {letter}
                    </p>
                </div>
            </div>
        </div>
    )
}