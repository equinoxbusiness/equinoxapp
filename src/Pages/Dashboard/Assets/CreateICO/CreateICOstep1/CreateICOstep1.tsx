import React from 'react';
import './CreateICOstep1.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addIcoFormData } from '../../../../../redux/actions';
import WithFormField from '../../../../../components/WithFormField';
import { connect } from "react-redux";

const CreateICOStep1Schema = Yup.object().shape({
  project: Yup.string()
    .required('Required'),
  assets: Yup.number()
    .required('Required'),
  supply: Yup.number().required('Required')
});

const CreateICOstep1 = (props: any) => {
  const {org} = props;

  const limitMaxvalue = (e: any) => {
    const val = e.target.value;
    if (org && org.project && org.project.length && org.project[0].fixed_supply && org.project[0].fixed_supply < val) {
      e.preventDefault();
    }
  }

  const handleBlur = (e: any, setFieldValue: any, values: any, setFieldError: any, setFieldTouched: any) => {
    if (!/^[0-9]+$/.test(values.supply)) {
      setFieldTouched('supply', 'true');
      setFieldError('supply', 'Not an number');
    } else if (values.supply%1000000000 !== 0) {
      setFieldValue('supply', values.supply*1000000000)
    }
  }

  return (
    <div className="CreateICOstep1" data-testid="CreateICOstep1">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h2 className="fw-bolder">Create ICO</h2>
                <p className="font14 fw-bold color_s">
                  ICO stands for Initial Coin Offering which allow ORG 3.0 to offer their Governance token holders to community at some price in BNB value. The BNB collected will be credited to MultiSig wallet and can be managed jointly by Team behind ORG 3.0
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    project: "Equinox Business",
                    assets: "",
                    supply: ""
                  }}
                  validationSchema={CreateICOStep1Schema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.dispatch(addIcoFormData(values));
                    props.nextStep();
                  }}
                >
                  {({ isValid, values , errors, touched, setFieldValue, setFieldError, setFieldTouched}) => {
                    return (
                      <Form>
                        <WithFormField label="Project" name="project" error={errors.project && touched.project}/>
                        <WithFormField label="Asset" name="assets" error={errors.assets && touched.assets} type="number"/>
                        <WithFormField label="Supply for ICO ( Add 9 decimals after your total supply, as contract is 9 decimals )" name="supply" error={errors.supply && touched.supply} type="number" onKeyPress={(event: any)=>limitMaxvalue(event)} onBlur={(e: any)=>handleBlur(e, setFieldValue, values, setFieldError, setFieldTouched)}/>
                        <div className="text-end mb-4">
                          <button className="next_btn">NEXT <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                        </div>
                      </Form>
                    )}
                  }
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org
  };
};

export default connect(mapStateToProps)(CreateICOstep1);
