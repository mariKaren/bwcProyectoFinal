import type { MessageState } from "../types/message";

interface MessageProps extends MessageState {
    onClose: () => void;
}

export const Message = ({ messageText, type, onClose }: MessageProps) => {
    return (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center gap-2`}>
        <span>{messageText}</span>
        <button onClick={onClose} className="ml-2 font-bold">×</button>
        </div>
    );
};