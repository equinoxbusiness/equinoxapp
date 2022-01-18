import { Form, Formik } from 'formik';
import React from 'react';
import './OrgStep2.scss';
import { connect } from "react-redux";
import WithFormField from '../../../components/WithFormField';
import * as Yup from 'yup';
import { addOrgFormData } from '../../../redux/actions';

const OrgStep2Schema = Yup.object().shape({
  phone: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  passport_no: Yup.string().required('Required'),
  pan: Yup.string().required('Required'),
  linkedin_link: Yup.string().required('Required'),
});

const OrgStep2 = (props: any) => (
  <div className="OrgStep2" data-testid="OrgStep2">
    <div className="container">
      <div className="inner_card ">
        <div className="w-100">
          <div className="row mb-4">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <p>ORG 3.0 LAUNCHPAD</p>
              <h2>STEP 2</h2>
              <p className="text-primary">
                Deployer KYC
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  phone: '',
                  email: '',
                  passport_no: '',
                  pan: '',
                  linkedin_link: '',
                }}
                validationSchema={OrgStep2Schema}
                onSubmit={async (values) => {
                  console.log(values)
                  await new Promise((r) => setTimeout(r, 500));
                  props.dispatch(addOrgFormData(values));
                  props.nextStep();
                }}
              >
                {({ isValid, errors, touched }) => (
                  <Form>
                    <WithFormField label="Phone" name="phone" type="number" error={errors.phone && touched.phone}/>
                    <WithFormField label="Email ID" name="email" type="email" error={errors.email && touched.email}/>
                    <WithFormField label="Passport No." name="passport_no" error={errors.passport_no && touched.passport_no}/>
                    <WithFormField label="Pan Card" name="pan" error={errors.pan && touched.pan}/>
                    <WithFormField label="LinkdIn profile link" name="linkedin_link" error={errors.linkedin_link && touched.linkedin_link}/>
                    <div className="float-start">
                      <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                    </div>
                    <div className="float-end ">
                      <button className="next_btn" type="submit" disabled={!isValid}>NEXT <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connect()(OrgStep2);
