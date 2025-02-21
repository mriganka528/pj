import UploadNoticeComponent from "./components/UploadNoticeComponent"
const page = () => {

  return (
    <>
      <UploadNoticeComponent />
      {/* <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attachments</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>{notice.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {notice.category}
                  </div>
                </TableCell>
                <TableCell>{notice.status}</TableCell>
                <TableCell>
                  {notice.attachments.length > 0 ? (
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2" />
                      <span>{notice.attachments.length}</span>
                    </div>
                  ) : (
                    "None"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(notice.dateUploaded)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table >
      </div > */}
    </>
  )
}

export default page
