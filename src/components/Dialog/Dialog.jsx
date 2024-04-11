import { createSignal } from "solid-js";
import styles from "./styles.module.css"

const Dialog = (props) => {
    const [dialogRef, setDialogRef] = createSignal()
  
    return (
    <dialog
      {...props}
      ref={(ref)=>{
        setDialogRef(ref)
        typeof props.ref === "function" ? props.ref(ref) : props.ref = ref;
      }}
      onClick={(event) => {
        props.onClick?.()

        if (event.clientX == 0 && event.clientY == 0) return

        const rect = dialogRef().getBoundingClientRect();
        var isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
            dialogRef().close();
        }
      }}
      class={styles.dialog}
    >
        {props.children}
    </dialog>
  );
};

export default Dialog;
