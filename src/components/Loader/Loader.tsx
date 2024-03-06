import classes from "./Loader.module.scss";

const Loader = ({ message }: { message: string }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.message}>{message}</div>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Loader;
