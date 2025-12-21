export class CreateDoctorDto {
  name: string;
  specialty: string;
  description?: string;
}

export class UpdateDoctorDto {
  name?: string;
  specialty?: string;
  description?: string;
}
