import React from "react";

import './css/write.css'

// const LOGO = process.env.PUBLIC_URL + "/cbnu128.png";

export default class Write extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <React.Fragment>

          <div id='Title'>
            Create Post
          </div>

          <form className='Write'>

            <div className='Category form-group row'>
              <label for='parent_category'>Category1</label>
              <select class="custom-select" id="parent_category">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <label for='child_category'>Category2</label>
              <select class="custom-select" id="child_category">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="Title form-group row">
              <label for="title_txt" class="col-form-label">Title</label>
              <input type="text" class="form-control" id="title_txt" placeholder="Post Title"/>
            </div>

            <div className='custom-file' id="upload_image">
              <label class="custom-file-label" for="product_image">Upload Product Image...</label>
              <input type="file" class="custom-file-input" id="product_image"/>
            </div>

            <div className='form-group Content'>
              <label for="content">Comment</label>
              <textarea class="form-control" id="content" rows="3"></textarea>
            </div>

            <div class="Mean">
            <p>Check Available Mean</p>
              <span class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                <label class="custom-control-label" for="customCheck1">Direct</label>
              </span>
              <span class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck2"/>
                <label class="custom-control-label" for="customCheck2">Shipping</label>
              </span>
            </div>

            <div className='Button'>
              <button type="submit" class="btn btn-primary">Submit</button>
              <button class="btn btn-secondary">Cancle</button>
            </div>

          </form>

        </React.Fragment>
    }
}