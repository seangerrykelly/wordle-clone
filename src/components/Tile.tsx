
import '../styles/Tile.css'

type TileProps = {
    letter?: string
    type?: 'correct' | 'present' | 'absent' | 'current'
}

export const Tile = ({ letter, type }: TileProps) => {
    return (
        <div className={`tile ${type}`}>
            <p className="tile-letter">
                {letter}
            </p>
        </div>
    )
}