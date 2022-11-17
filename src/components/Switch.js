const Switch = ({ checked }) => {
  return (
    <label class="switch">
      <input checked={checked} type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
};

export default Switch;
