const Switch = ({ checked, onChange }) => {
  return (
    <label class="switch">
      <input onChange={onChange} checked={checked} type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
};

export default Switch;
