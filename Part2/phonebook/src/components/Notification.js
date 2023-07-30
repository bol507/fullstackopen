const Info = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="info">
      <p className="font-bold">Information message</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

const Success = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="success">
      <p className="font-bold">Successful message</p>
      <p className="text-sm">{message}</p>
      
    </div>
  );
};

const Warning = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="warning">
      <p className="font-bold">warning message</p>
      <p className="text-sm">{message}</p>
      
    </div>
  );
}

const Error = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="error">
      <p className="font-bold">Error message</p>
      <p className="text-sm">{message}</p>
      
    </div>
  );
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  if (type === "info") {
    return <Info message={message} />
  }

  if (type === "success") {
    return <Success message={message} />
  }

  if (type === "error") {
    return <Error message={message} />
  }

  if (type === "warning") {
    return <Warning message={message} />
  }

  return null;
};

export default Notification;