import React from "react";
import EmojiPicker from "emoji-picker-react";
function ChatEmojiPicker({ onEmojiClick }) {
  return (
    <div className="chat-emoji-picker">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default ChatEmojiPicker;
