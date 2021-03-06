import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import dialogStyles from "../styles/dialog.module.css"
import tableStyles from "../styles/table.module.css"
import utilStyles from "../styles/utils.module.css"
import formStyles from "../styles/form.module.css"
import Image from "next/image"
import 'react-toastify/dist/ReactToastify.css';
import { ACTIVE_PREVIEW, ALLOWED_FORMATS, CATEGORIES_SELECTION_LIMIT, WEBSITE } from '../util/variables'
import { Input } from './common/Input'
import BadWordsFilter from 'bad-words'
import { Button } from './common/Button'
import FadeIn from 'react-fade-in';
import { Payment } from './Payment'
import { server } from '../config'
import { classNames, getSelectOptions, getSelectStyles } from '../lib/util'
import { ModalLoader } from './ModalLoader'
import { useDropzone } from 'react-dropzone'
import { Select } from './common/Select'
import { showError } from '../lib/toast'
import detectDevice from './common/DeviceDetect'

export function AddWebsiteDialog(props) {
  let defaultWebsite = WEBSITE.DEFAULT
  if (props.website) {
    defaultWebsite.page = props.website.page
    defaultWebsite.rowIndex = props.website.rowIndex
    defaultWebsite.columnIndex = props.website.columnIndex
  }
  const defaultState = {
    websiteValid: null,
    websiteAlreadyExist: false,
    step: 1,
    amount: 2,
    showTitle: false,
    showDescription: false,
    website: defaultWebsite,
    loading: false,
    activePreview: isMobile ? ACTIVE_PREVIEW.MOBILE : ACTIVE_PREVIEW.WEB
  }
  const [state, setState] = useState(defaultState)

  const isMobile = detectDevice()
  const { getRootProps, getInputProps } = useDropzone({
    accept: ALLOWED_FORMATS,
    multiple: false,
    disabled: state.step === 3, onDropRejected: () => {
      showError("Invalid file type. Try again", 5000)
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles[0] && onImageChange(acceptedFiles[0])
    }
  })

  const close = () => {
    if (state.website.image) {
      deleteUnusedUploadedImage()
    }
    props.close()
  }

  const deleteUnusedUploadedImage = async () => {
    return await fetch(
      `${server}/api/deleteimage?filename=${state.website.thumbnail.cloudinaryId}`, {
      method: "DELETE"
    })
  }
  const onWebsiteUrlChange = (event) => {
    event.target.value = event.target.value.replace(/\s/g, "");
    setState({
      ...state,
      imageError: false,
      website: {
        ...state.website,
        [event.target.name]: event.target.value
      },
      websiteValid: null,
      websiteValid: null,
      websiteAlreadyExist: false
    })
  }

  const onDescriptionChange = (event) => {
    const filter = new BadWordsFilter()

    setState({
      ...state,
      validationError: false,
      website: {
        ...state.website,
        [event.target.name]: event.target.value,
      },
      [event.target.name + "Profane"]: filter.isProfane(event.target.value)
    })
  }

  const onImageChange = async (file) => {
    toggleLoading(true, "Uploading image...")
    const formData = new FormData()
    if (!file && file.type.substr(0, 5) !== "image") return
    if (state.website.image) {
      deleteUnusedUploadedImage()
    }
    formData.append('image', file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET)
    const uploadUrl = `${server}/api/upload`
    const uploadRequest = await fetch(uploadUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    const uploadResponse = await uploadRequest.json()
    if (!uploadResponse.uploaded) {
      toggleLoading(false)
      setState({
        ...state,
        imagePreviewHovered: false,
        imageError: uploadResponse.message
      })
      showError(uploadResponse.message)
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async () => {
        toggleLoading(false)
        setState({
          ...state,
          imageUnsafeText: '',
          imagePreviewHovered: false,
          imageError: false,
          previewImageUrl: uploadResponse.url,
          website: {
            ...state.website,
            thumbnail: {
              cloudinaryId: uploadResponse.cloudinaryId
            },
            image: file
          }
        })
      }
    }
  }

  const addWebsiteCallback = () => {
    setState({ ...state, website: { ...state.website, image: null } })
  }

  const onVerifyWebsiteClick = async (event) => {
    const urlRegExp = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    const urlValid = state.website.url.match(urlRegExp)
    if (!urlValid) {
      setState({ ...state, websiteValid: false, urlError: `URL ${state.website.url} does not match valid URL pattern. Try again.` })
      return
    }
    event.stopPropagation()
    event.preventDefault()
    toggleLoading(true, "Verifying URL...")
    const validateWebsiteURL = `${server}/api/validate?url=${state.website.url}&page=${state.website.page}`
    const websiteResponse = await fetch(validateWebsiteURL, {
      mode: 'no-cors'
    })
    if (websiteResponse.status === 409) {
      setState({
        ...state,
        websiteAlreadyExist: true,
        websiteValid: null
      })
      return
    } else if (websiteResponse.status === 404) {
      let data = await websiteResponse.json()
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: false,
        websiteAlreadyExist: null,
        urlError: data.error
      })
    } else if (websiteResponse.status === 200) {
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: true,
        websiteAlreadyExist: null,
        showTitle: true,
        showDescription: true
      })
    } else {
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: false,
        websiteAlreadyExist: null,
        urlError: `URL ${state.website.url} is not valid. Try again`
      })
    }
  }
  const toggleLoading = (value, text) => {
    setState({ ...state, loading: value, loaderText: text })
  }
  const onNextStep = () => {
    if (state.step === 2 && (!state.website.categories.length || !state.website.description.length)) {
      setState({ ...state, validationError: true })
    } else {
      setState({
        ...state,
        validationError: false,
        step: state.step + 1,
        urlError: null,
        imageError: null,
        websiteAlreadyExist: null,
      })
    }
  }

  const onPreviousStep = () => {
    localStorage.removeItem('amount')
    setState({ ...state, step: state.step - 1 })
  }

  const urlInputClasses = classNames({
    [dialogStyles.urlInput]: true,
    [formStyles.input]: true
  })
  const urlInputPlaceholder = isMobile ? "Enter address..." : `Enter address with maximum of ${WEBSITE.URL_MAX_LENGTH} characters`

  const onSelect = (selectedList, controlName) => {
    setState({ ...state, validationError: false, website: { ...state.website, [controlName]: selectedList } })
  }

  const onRemove = (selectedList, controlName) => {
    setState({ ...state, website: { ...state.website, [controlName]: selectedList } })
  }

  const getFormData = () => {
    const categories = state.website.categories.map(category => {
      return category.value
    })
    const countries = state.website.countries && state.website.countries.map(category => {
      return category.value
    })
    return {
      url: state.website.url,
      page: props.website.page,
      rowIndex: props.website.rowIndex,
      columnIndex: props.website.columnIndex,
      thumbnail: { ...state.website.thumbnail, url: state.previewImageUrl },
      createdAt: new Date(),
      categories,
      countries,
      description: state.website.description
    }

  }

  const cellClasses = classNames({
    [tableStyles.emptyCell]: true,
    [tableStyles.cellDisabled]: props.filterActive
  })

  const imagePreviewClasses = classNames({
    [tableStyles.websiteImage]: true,
    [tableStyles.previewImage]: true,
    [dialogStyles.imagePreviewHovered]: state.imagePreviewHovered,
  })

  const dropZoneClasses = classNames({
    [utilStyles.dropZone]: true,
    [utilStyles.dropZoneDisabled]: state.step === 3
  })

  const selectStyles = getSelectStyles()
  const selectClasses = classNames({
    [utilStyles.formControlError]: state.validationError && !state.website.categories.length
  })

  const descriptionInputClasses = classNames({
    [utilStyles.inputError]: state.validationError && !state.website.description.length
  })
  const nextButtonWrapperClasses = classNames({
    [utilStyles.fullWidth]: isMobile
  })
  const previousButtonWrapperClasses = classNames({
    [utilStyles.fullWidth]: isMobile,
    [utilStyles.marginRight]: isMobile
  })
  const nextButtonDisabled = !state.websiteValid || state.titleProfane || state.descriptionProfane
  const countryOptions = getSelectOptions(WEBSITE.COUNTRIES)
  const categoryOptions = getSelectOptions(WEBSITE.CATEGORIES)

  const webActivePreviewModeClass = classNames({
    [dialogStyles.activePreviewMode]: state.activePreview === ACTIVE_PREVIEW.WEB,
    [dialogStyles.previewWebButton]: true
  })

  const mobileActivePreviewModeClass = classNames({
    [dialogStyles.activePreviewMode]: state.activePreview === ACTIVE_PREVIEW.MOBILE,
    [dialogStyles.previewMobileButton]: true
  })

  const attributesSectionId = state.activePreview === ACTIVE_PREVIEW.WEB ? dialogStyles.attributesSection : "attributesSection"
  const onPreviewModeButtonClicked = (mode) => {
    setState({ ...state, activePreview: mode })
  }

  const renderWebPreview = () => {
    return <div className={dialogStyles.imagePreviewWrapper}
      onMouseEnter={() => { state.step !== 3 && setState({ ...state, imagePreviewHovered: true }) }}
      onMouseLeave={() => setState({ ...state, imagePreviewHovered: false })}
    >
      <div {...getRootProps({ className: dropZoneClasses })}>
        <input {...getInputProps()} />
        <div id={dialogStyles.imageUploadOverlay}>Drop or click here to upload</div>
        {state.step !== 1 && <div className={dialogStyles.imagePreviewInfoWeb}>
          <div className={dialogStyles.previewInfoRow}>
            <span>URL</span>
            <strong>{state.website.url || "www.exampleurl.com"}</strong>
          </div>
          <div className={dialogStyles.previewInfoRow}>
            <span>Description</span>
            <strong>{state.website.description || "Description goes here"}</strong>
          </div>
        </div>}

        <Image
          priority
          src={state.previewImageUrl || WEBSITE.THUMBNAIL.IMAGE_PREVIEW_DEFAULT}
          className={imagePreviewClasses}
          layout="fill"
          alt="No image found"
        />

      </div>
    </div>
  }

  const renderMobilePreview = () => {
    const mobileImageInfoTopClasses = classNames({
      [utilStyles.mobileImageInfoTop]: true,
      [utilStyles.mobilePreviewImageInfoTop]: true,
    })

    const mobileImageInfoBottomClasses = classNames({
      [utilStyles.mobileImageInfoBottom]: true,
      [utilStyles.mobilePreviewImageInfoBottom]: true,
    })

    const mobilePreviewImageClasses = classNames({
      [tableStyles.websiteImage]: true,
      [tableStyles.previewImage]: state.step === 1,
      [dialogStyles.mobilePreviewImageMobile]: state.step !== 1 && isMobile,
      [dialogStyles.mobilePreviewImageWeb]: state.step !== 1 && !isMobile,
      [dialogStyles.imagePreviewHovered]: state.imagePreviewHovered,
    })

    const mobilePreviewWrapperClasses = classNames({
      [dialogStyles.imagePreviewWrapper]: state.step === 1,
      [dialogStyles.mobilePreviewImageWrapperWeb]: state.step !== 1 && !isMobile,
      [dialogStyles.mobilePreviewImageWrapperMobile]: state.step !== 1 && isMobile,
    })

    const imageUploadOverlayClasses = classNames({
      [dialogStyles.imageUploadOverlay]: state.step === 1,
      [dialogStyles.mobileImageUploadOverlay]: state.step !== 1,
    })

    return <div className={mobilePreviewWrapperClasses}
      onMouseEnter={() => { state.step !== 3 && setState({ ...state, imagePreviewHovered: true }) }}
      onMouseLeave={() => setState({ ...state, imagePreviewHovered: false })}
    >
      <div {...getRootProps({ className: dropZoneClasses })}>
        <input {...getInputProps()} />
        {!isMobile && <div id={imageUploadOverlayClasses}>Drop or click here to upload</div>}
        {state.step !== 1 && <div className={mobileImageInfoTopClasses}>

          <span>URL</span>
          <strong>{state.website.url || "www.exampleurl.com"}</strong>
        </div>}

        <Image
          src={state.previewImageUrl || WEBSITE.THUMBNAIL.IMAGE_PREVIEW_DEFAULT}
          className={mobilePreviewImageClasses}
          layout="fill"
          alt="No image found"
        />

        {state.step !== 1 && <div className={mobileImageInfoBottomClasses}>
          <span>Description</span>
          <strong>{state.website.description || "Description goes here"}</strong>
        </div>}

      </div>
    </div>
  }

  return (
    <div className={cellClasses} id={props.id}>
      {/* Dialog */}
      <Dialog className={dialogStyles.containerMedium} aria-label="add-website-dialog" isOpen={state.showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <button className={utilStyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>??</span>
          </button>
          <div className={dialogStyles.title}>Add website</div>
          {state.step === 1 && <div className={utilStyles.stepTitle}>URL and Image</div>}
          {state.step === 2 && <div className={utilStyles.stepTitle}>Website appearance</div>}
          {state.step === 3 && <div className={utilStyles.stepTitle}>Payment</div>}

          {state.loading && <ModalLoader text={state.loaderText} />}

          <div className={dialogStyles.activePreviewModeButtons}>
            {state.step !== 1 && <Button primary onClick={() => onPreviewModeButtonClicked(ACTIVE_PREVIEW.WEB)}
              className={webActivePreviewModeClass}>Preview on web</Button>}
            {state.step !== 1 && <Button primary onClick={() => onPreviewModeButtonClicked(ACTIVE_PREVIEW.MOBILE)}
              className={mobileActivePreviewModeClass}>Preview on mobile</Button>}
          </div>

          <div className={dialogStyles.websitePreview}>
            {state.step !== 3 && <div style={{ fontStyle: "italic" }}>Drop or click on image to upload</div>}
            {state.activePreview === ACTIVE_PREVIEW.MOBILE ? renderMobilePreview() : renderWebPreview()}
            {state.step === 1 && <div style={{ fontStyle: "italic" }}>Supported formats are <strong>JPG, JPEG</strong> and <strong>PNG</strong></div>}

            {/* Image preview end*/}
          </div>
        </FadeIn>
        {/* First step */}
        {state.step === 1 && <FadeIn transitionDuration={500}>
          <div className={dialogStyles.step}>
            <div id={dialogStyles.websiteInputWrapper}>
              <span style={{ display: "flex" }}>
                <span>
                  <label htmlFor="url" className={utilStyles.formItemSpacing}>*Website Address</label>
                  <input
                    style={{ minWidth: '14vw' }}
                    className={urlInputClasses}
                    value={state.website.url}
                    placeholder={urlInputPlaceholder}
                    id="url"
                    name="url"
                    onChange={onWebsiteUrlChange}
                    onKeyDown={() => event.key === 'Enter' && onVerifyWebsiteClick(event)}
                    type="text"
                    autoComplete="url"
                    maxLength={WEBSITE.URL_MAX_LENGTH}
                  />
                  <span>*Make sure that URL starts with https://</span>
                </span>
                {state.websiteValid && <span className={dialogStyles.checkmark}>
                  <div className={dialogStyles.checkmarkStem}></div>
                  <div className={dialogStyles.checkmarkKick}></div>
                </span>}
              </span>
              <span style={{ marginLeft: "5%" }}>
                <Button
                  primary
                  onClick={() => onVerifyWebsiteClick(event)}
                  disabled={state.websiteValid || !state.website.url}
                  className={dialogStyles.verifyButton}
                >
                  Verify
                </Button>
              </span>
            </div>
            {(!state.websiteValid && state.websiteValid !== null) && <span className={utilStyles.error}>{state.urlError}</span>}
            {state.websiteAlreadyExist && <strong className={utilStyles.warning}>Website with url *{state.website.url}* has been found. But, If new website is located 10 or more pages before/after it's nearest location, it can be added again.</strong>}

            {state.website.url && (state.website.url.length === WEBSITE.URL_MAX_LENGTH) && <span className={utilStyles.error}>Character limit reached.</span>}
          </div>
          <div id={dialogStyles.stepButtonsWrapper} style={{ justifyContent: "center", marginLeft: "0" }}>
            {state.step !== 2 && <Button primary onClick={onNextStep} disabled={nextButtonDisabled}
              wrapperClasses={nextButtonWrapperClasses}>Next</Button>}
          </div>
        </FadeIn>}
        {/* First step end */}

        {/* Second step */}
        {state.step === 2 && <FadeIn transitionDuration={500}>
          <form>
            <section id={attributesSectionId}>
              <div className={dialogStyles.row}>
                <Input
                  required
                  maxWidth
                  label='Description'
                  placeholder={`Enter maximum of ${WEBSITE.DESCRIPTION_MAX_LENGTH} characters...`}
                  disabled={!state.websiteValid}
                  name='description'
                  value={state.website.description}
                  onChange={(event) => onDescriptionChange(event)}
                  maxLength={WEBSITE.DESCRIPTION_MAX_LENGTH}
                  className={descriptionInputClasses}
                />
              </div>
              {state.validationError && !state.website.description.length && <div className={dialogStyles.row}>
                <span className={utilStyles.error}>Description is required</span>
              </div>}
              <div className={dialogStyles.row}>
                <div>
                  {state.website.description && (state.website.description.length === WEBSITE.DESCRIPTION_MAX_LENGTH) && <span className={utilStyles.error}>Character limit reached.</span>}
                  {state.descriptionProfane && <span className={utilStyles.error}>Bad words are not allowed.</span>}
                </div>
              </div>
              <div className={dialogStyles.row}>
                <Select
                  required
                  maxWidth
                  showCheckbox
                  id="categoriesSelect"
                  label="Categories"
                  placeholder="Select categories"
                  groupBy="categoryId"
                  name="categories"
                  options={categoryOptions}
                  onSelect={(selectedList) => onSelect(selectedList, 'categories')}
                  onRemove={(selectedList) => onRemove(selectedList, 'categories')}
                  selectedValues={state.website.categories}
                  style={selectStyles}
                  className={selectClasses}
                  selectionLimit={CATEGORIES_SELECTION_LIMIT}
                />
              </div>
              {state.validationError && !state.website.categories.length && <div className={dialogStyles.row}>
                <span className={utilStyles.error}>Select one or more categories</span>
              </div>}
              <div className={dialogStyles.row}>
                <Select
                  maxWidth
                  id="countriesSelect"
                  showCheckbox
                  label="Countries"
                  placeholder="Select countries"
                  options={countryOptions}
                  name="countries"
                  onSelect={(selectedList) => onSelect(selectedList, 'countries')}
                  onRemove={(selectedList) => onRemove(selectedList, 'countries')}
                  onRemove={onRemove}
                  selectedValues={state.website.countries}
                  style={selectStyles}
                />
              </div>

            </section>
          </form>
          <div id={dialogStyles.stepButtonsWrapper} style={{ justifyContent: "space-between" }}>
            <Button primary onClick={onPreviousStep} wrapperClasses={previousButtonWrapperClasses} disabled={state.step === 1} className={dialogStyles.stepButton}>Previous</Button>
            <Button primary onClick={onNextStep} wrapperClasses={nextButtonWrapperClasses}
              disabled={nextButtonDisabled} className={dialogStyles.stepButton}>Next</Button>
          </div>
        </FadeIn>}
        {/* Second step end */}

        {/* Third step */}
        {state.step === 3 && <FadeIn transitionDuration={500}>
          <Payment
            addWebsiteCallback={addWebsiteCallback}
            close={props.close}
            toggleLoading={toggleLoading}
            getFormData={getFormData}
            webPreviewActive={state.activePreview === ACTIVE_PREVIEW.WEB}
          />
          <div id={dialogStyles.stepButtonsWrapper} style={{ justifyContent: "center" }}>
            <Button primary onClick={onPreviousStep} wrapperClasses={nextButtonWrapperClasses} className={dialogStyles.stepButton}>Previous</Button>
          </div>
        </FadeIn>}
        {/* Third step end*/}
      </Dialog>
      {/* Dialog */}
    </div>
  )
}