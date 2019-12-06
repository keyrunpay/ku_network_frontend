import React from "react";
import "./_feedpostmaker.scss";
import { Icon, Button } from "antd";
import { doPost, uploadFile } from "../../api/ApiCalls";
import { useDispatch } from "react-redux";
import { setPostLoadingState } from "../../redux/actions/posts";
import UserImageView from "../UserImageView/UserImageView";

export default function FeedPostMaker() {
  const [writeMode, setWriteMode] = React.useState(false);
  const [state, setState] = React.useState({
    loading: false,
    fileForUpload: null,
    fileUploadLoading: false
  });
  const [fileUploaded, setFileUploaded] = React.useState([]);

  const postRef = React.createRef();
  const fileRef = React.createRef();
  const dispatch = useDispatch();

  const removeUploaded = cnt => {
    setFileUploaded(fileUploaded.filter((item, index) => index !== cnt));
  };
  const getFileUploadedId = () => {
    if (fileUploaded.length > 0) {
      const newFile = [...fileUploaded];
      let str = "";
      newFile.forEach(item => {
        str += item.id + ",";
      });
      str = str.substring(0, str.length - 1);
      return str;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const addFile = () => {
      const data = new FormData();
      data.append("file", state.fileForUpload);
      data.append("file_for", "post");
      data.append("file_type", "image");
      setState({ ...state, fileUploadLoading: true });

      uploadFile(data)
        .then(res => {
          const new_file_data = { id: res.id, url: res.url };
          setFileUploaded([...fileUploaded, new_file_data]);
          setState({ ...state, fileUploadLoading: false });
        })
        .catch(err => {
          setState({ ...state, fileUploadLoading: false });
        });
    };

    if (state.fileForUpload !== null) {
      addFile();
      console.log("hitting add file");
    }
    // eslint-disable-next-line
  }, [state.fileForUpload]);

  const handleClick = () => {
    setState({ ...state, loading: true });
    const payload = {
      body_text: postRef.current.value,
      has_attachments: getFileUploadedId()
    };
    doPost(payload)
      .then(res => {
        setFileUploaded([]);
        setState({ ...state, loading: false });
        setWriteMode(false);
        dispatch(setPostLoadingState(true));
      })
      .catch(err => {
        setState({ ...state, loading: false });
      });
  };

  return (
    <div className="feed-post-maker">
      {!writeMode && (
        <div
          onClick={() => {
            setWriteMode(true);
          }}
          className="flex ci jcsb"
        >
          <div className="flex ci">
            <div className="img">
              <UserImageView />
            </div>
            <div className="text">
              <p>Something a post?</p>
            </div>
          </div>
          <div className="post-maker-right">
            <Icon type="file-image" />
          </div>
        </div>
      )}
      {writeMode && (
        <div className="feed-post-maker-editor">
          <div
            className="feed-post-editor-overlay"
            onClick={() => {
              setWriteMode(false);
            }}
          ></div>
          <div className="feed-post-editor-content">
            <div className="top">
              <div className="flex">
                <div className="img">
                  <UserImageView />
                </div>
                <div className="text-field">
                  <div className="text-top">
                    <textarea
                      ref={postRef}
                      placeholder="Write a post here...."
                    ></textarea>
                    <input
                      type="file"
                      ref={fileRef}
                      onChange={e => {
                        setState({
                          ...state,
                          fileForUpload: e.target.files[0]
                        });
                      }}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="bottom">
                    {/* attachments preview */}
                    {fileUploaded.length > 0 && (
                      <div className="post-attachments">
                        <header>
                          <h1>Attachments</h1>
                        </header>
                        <div className="attachment-content flex ci">
                          {fileUploaded.map((item, index) => {
                            return (
                              <FileItem
                                key={item.id}
                                url={item.url}
                                id={item.id}
                                removeAttachment={() => {
                                  removeUploaded(index);
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex jcsb ci">
                      <div className="left">
                        {!state.fileUploadLoading && (
                          <Icon
                            onClick={() => {
                              fileRef.current.click();
                            }}
                            type="file-image"
                            style={{ width: "25px", height: "25px" }}
                          ></Icon>
                        )}
                        {state.fileUploadLoading && (
                          <Icon
                            type="loading"
                            style={{ width: "25px", height: "25px" }}
                          ></Icon>
                        )}
                      </div>
                      <div className="right">
                        <Button
                          onClick={() => {
                            handleClick();
                          }}
                          loading={state.loading}
                          type="primary"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const FileItem = props => {
  return (
    <div className="file-item-preview">
      <div className="close">
        <Button
          size="small"
          onClick={() => {
            props.removeAttachment();
          }}
          shape="circle"
          icon="close"
        ></Button>
      </div>
      <img src={props.url} alt="" />
    </div>
  );
};
