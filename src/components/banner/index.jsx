import React from 'react'
import AppButton from '../../common/button';

function Banner() {
  return (
    <div className="et_pb_section et_pb_section_0 et_pb_fullwidth_section et_section_regular">
      <section
        className="et_pb_module et_pb_fullwidth_header et_pb_fullwidth_header_0 et_pb_text_align_center et_pb_bg_layout_dark et_pb_fullscreen"
        style={{ minHeight: 534 }}
      >
        <div
          className="et_pb_fullwidth_header_container center"
          style={{ minHeight: 610 }}
        >
          <div className="header-content-container center">
            <div className="header-content">
              <img
                src="/assets/images/astrology-illustrations-18.png"
                alt=""
                className="header-logo"
              />
              <h1 className="et_pb_module_header">Astrologer</h1>
              <div className="et_pb_header_content_wrapper">
                <p>
                  Astrologer Home is brimming with free articles, features, interpretations, 
                and tools that will appeal to people with a casual interest in learning Astrology, 
                as well as beginning through advanced students of Astrology. 
                The site is run by FPT students team.
                </p>
              </div>
              <AppButton
                children="get started"
                btnType="button_1"
                htmlType="a"
              />
              <span style={{padding:"10px"}}/>
              <AppButton
                children="contact us"
                btnType="button_2"
                htmlType="a"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner