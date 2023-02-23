import { createBoard } from '@wixc3/react-board';
import Button from '../../../components/Button/Button';

export default createBoard({
    name: 'Button',
    Board: () => <Button variant="primary">I am a Button</Button>
});
