import React from 'react';
import './ProposalStep2.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addProposalFormData } from '../../../../redux/actions';
import axios from 'axios';

const ProposalStep2Schema = Yup.object().shape({
  description: Yup.string()
    .required('Required'),
  doc: Yup.string()
});

const ProposalStep2 = (props: any) => {

  const deploy = async (values: any) => {
    addProposal(values);
    props.dispatch(addProposalFormData(values));
  }

  const addProposal = (values: any) => {
    if (props.org && props.org.project && props.org.project.length) {
      console.log(values)
      const skipFields: any = [];
      const formData: any = new FormData();
      formData.append('org_id', props.org.org.id);
      formData.append('project_id', props.org.project[0].id);
      const data = {
        ...props.proposalFormdata,
        ...values
      }
      for (const [key, value] of Object.entries(data)) {
        if (!skipFields.includes(key)) {
          formData.append(key, value);
        }
      }
      
      axios.post(`${process.env.REACT_APP_API_URL}/add_proposal`, formData)
        .then((res)=>{
          console.log(res);
          props.nextStep();
        });
    }
  }

  return (
    <div className="ProposalStep2" data-testid="ProposalStep2">
      <div className="w-100">
        <div className="row mb-4">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2 className="fw-bolder">STEP 2</h2>
            <p className="font14 fw-bold color_s">
            Proposals are decisions taken by ORG 3.0 team and are open for vote in a time bound manner by G-Token holders of the Project.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Formik
              enableReinitialize={true}
              initialValues={{
                description: "",
                doc: ""
              }}
              validationSchema={ProposalStep2Schema}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                deploy(values);
              }}
            >
              {({ isValid, values , errors, touched, setFieldValue, setFieldError, setFieldTouched}) => {
                return (
                  <Form>
                    <div className="my_input double-line">
                      <div className="text-start">
                        <label>Description (Min 200 Words, Max 1000 Words)</label>
                      </div>
                      <Field component="textarea" rows="4" name={"description"} className={errors.description && touched.description ? "invalid": ""}></Field>
                    </div>
                    <div className="with-form-field">
                      <div className="text-start">
                        <label htmlFor="upload" className="form-label" title="upload">Upload Doc (If any)</label>
                      </div>
                      <input id="doc" name="doc" type="file" onChange={(event) => { setFieldValue("doc", event.currentTarget.files ? event.currentTarget.files[0] : ''); }} className="form-input bg-white" />
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <button className="next_btn color_s rotate_icon" onClick={props.previousStep}> <i className="fa fa-sign-in ps-2" aria-hidden="true"></i> BACK </button>
                      <button className="next_btn color_s" type="submit">SAVE</button>
                      <button className="next_btn color_s" type="submit">PUBLISH <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
        <div>
        </div>
      </div>

    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org,
    proposalFormdata: state.proposalFormdata
  };
};

export default connect(mapStateToProps)(ProposalStep2);
